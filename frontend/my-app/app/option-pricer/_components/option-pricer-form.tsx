"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { optionPricerSchema } from "../_schema/option-pricer-schema"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

export function OptionPricerForm() {
    const form = useForm<z.infer<typeof optionPricerSchema>>({
        resolver: zodResolver(optionPricerSchema),
        defaultValues: {
            spotPrice: 0,
            strikePrice: 0,
            time: 0,
            volatility: 0,
            rate: 0,
        },
    })

    function onSubmit(data: z.infer<typeof optionPricerSchema>) {
        console.log("Form submitted:", data)
    }

    return (
        <Card className="w-full h-full sm:max-w-md ">
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="spotPrice"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} orientation="horizontal">
                                    <FieldLabel className="w-1/2">
                                        Spot Price:
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        className="w-1/2"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}