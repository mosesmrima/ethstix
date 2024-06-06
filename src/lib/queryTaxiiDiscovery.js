const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const TAXII_POLL_URL = 'https://cti.eclecticiq.com/taxii/poll';
const COLLECTION_NAME = 'eclecticiq_the_analyst_prompt_stix2_1'; // Replace with your desired collection name

const extractIOCs = (data) => {
    const iocs = [];
    if (data['taxii_11:Poll_Response'] && data['taxii_11:Poll_Response']['taxii_11:Content_Block']) {
        data['taxii_11:Poll_Response']['taxii_11:Content_Block'].forEach(block => {
            if (block['taxii_11:Content']) {
                const content = block['taxii_11:Content'][0];
                // Assuming content is in STIX 2.1 format, parsing it as JSON
                const stixContent = JSON.parse(content);
                if (stixContent.objects) {
                    stixContent.objects.forEach(obj => {
                        if (obj.type === 'indicator') {
                            const indicator = {
                                id: obj.id,
                                type: obj.type,
                                labels: obj.labels,
                                pattern: obj.pattern,
                                created: obj.created,
                                modified: obj.modified
                            };
                            iocs.push(indicator);
                        }
                    });
                }
            }
        });
    }
    return iocs;
};

const pollTaxiiCollection = async () => {
    try {
        const response = await axios.post(TAXII_POLL_URL, `
      <taxii_11:Poll_Request xmlns:taxii_11="http://taxii.mitre.org/messages/taxii_xml_binding-1.1" message_id="1" collection_name="${COLLECTION_NAME}">
        <taxii_11:Exclusive_Begin_Timestamp>1970-01-01T00:00:00Z</taxii_11:Exclusive_Begin_Timestamp>
        <taxii_11:Inclusive_End_Timestamp>${new Date().toISOString()}</taxii_11:Inclusive_End_Timestamp>
        <taxii_11:Poll_Parameters allow_asynch="false">
          <taxii_11:Response_Type>FULL</taxii_11:Response_Type>
        </taxii_11:Poll_Parameters>
      </taxii_11:Poll_Request>
    `, {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml',
                'X-TAXII-Content-Type': 'urn:taxii.mitre.org:message:xml:1.1',
                'X-TAXII-Services': 'urn:taxii.mitre.org:services:1.1'
            }
        });

        // Parse the XML response
        const parsedResponse = await xml2js.parseStringPromise(response.data);

        // Extract IOCs from the response
        const iocs = extractIOCs(parsedResponse);

        // Save IOCs to a JSON file
        const jsonResponse = JSON.stringify(iocs, null, 2);
        const filePath = path.join(__dirname, 'iocs.json');
        fs.writeFileSync(filePath, jsonResponse);

        console.log(`IOCs saved to ${filePath}`);
    } catch (error) {
        console.error('Error polling TAXII collection:', error);
    }
};

pollTaxiiCollection();
