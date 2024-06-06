"use client";
import React, { useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardHeader, CardBody, Input, Button, Textarea, Spinner, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { RiDeleteBinLine, RiAddFill } from "@remixicon/react";
import { toast } from "react-toastify";

const IndicatorForm = () => {
    const { control, register, handleSubmit, reset } = useForm({
        defaultValues: {
            indicators: [
                {
                    id: '',
                    type: 'indicator',
                    labels: '',
                    pattern: '',
                    created: '',
                    modified: '',
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'indicators',
    });

    const { register: registerJson, handleSubmit: handleSubmitJson } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFileChange = (data) => {
        const file = data.jsonFile[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const content = JSON.parse(event.target.result);
                    reset({ indicators: content });
                } catch (error) {
                    console.error("Error parsing JSON", error);
                }
            };
            reader.readAsText(file);
        } else {
            console.error("Please upload a valid JSON file.");
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setIsModalOpen(true);

        const processedData = data.indicators.map(indicator => ({
            ...indicator
        }));

        try {
            const response = await axios.post('/api/add/indicators', {
                indicators: processedData,
            });

            reset({
                indicators: [
                    {
                        id: '',
                        type: 'indicator',
                        labels: '',
                        pattern: '',
                        created: '',
                        modified: '',
                    },
                ],
            });

            toast.success("Data has been published successfully!");
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error("Failed to publish data!");
        } finally {
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    };

    const onJsonSubmit = (data) => {
        onFileChange(data);
    };

    return (
        <div className="flex items-center flex-col prose prose-invert">
            <h2>Have some intel to share? You can...</h2>
            <div className="p-2 flex items-start gap-48">
                <Card className="w-[600px]">
                    <CardHeader>
                        <h4>...add artifacts using this form</h4>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex flex-col gap-2 mb-4">
                                    <div className="flex gap-2">
                                        <Input
                                            {...register(`indicators.${index}.type`)}
                                            label="Type"
                                            initialValue="indicator"
                                            readOnly
                                        />
                                        <Input
                                            {...register(`indicators.${index}.id`)}
                                            label="Indicator ID"
                                        />
                                    </div>
                                    <Textarea
                                        {...register(`indicators.${index}.labels`)}
                                        label="Labels (comma separated)"
                                        size="sm"
                                    />
                                    <Textarea
                                        {...register(`indicators.${index}.pattern`)}
                                        label="Pattern"
                                        size="sm"
                                    />
                                    <div className="flex gap-2">
                                        <Input
                                            {...register(`indicators.${index}.created`)}
                                            label="Created (YYYY-MM-DD)"
                                        />
                                        <Input
                                            {...register(`indicators.${index}.modified`)}
                                            label="Modified (YYYY-MM-DD)"
                                        />
                                    </div>
                                    <Button
                                        className="self-center m-2"
                                        size="sm"
                                        endContent={<RiDeleteBinLine size={15} />}
                                        color="danger"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <div className="flex flex-col gap-4">
                                <Button
                                    endContent={<RiAddFill size={15} />}
                                    variant="bordered"
                                    color="primary"
                                    onClick={() => append({
                                        id: '',
                                        type: 'indicator',
                                        labels: '',
                                        pattern: '',
                                        created: '',
                                        modified: ''
                                    })}
                                >
                                    Add
                                </Button>
                                <Button className="self-end" color="primary" type="submit" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex gap-3">
                        <h4>... or upload a JSON file</h4>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmitJson(onJsonSubmit)}>
                            <Input type="file" accept=".json" {...registerJson("jsonFile")} />
                            <Button className="mt-4" color="primary" type="submit">Upload JSON</Button>
                        </form>
                    </CardBody>
                </Card>
            </div>

            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} backdrop="blur">
                <ModalContent>
                    <ModalBody>
                        <div className="flex justify-center items-center h-48">
                            <Spinner size="lg" color="primary" />
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default IndicatorForm;
