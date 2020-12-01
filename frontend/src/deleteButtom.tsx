import { FC, useState, createContext, FormEvent } from 'react';
import { PrimaryButton, gray5, gray6 } from './Styles';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export interface Value {
    [key: string]: any;
}
export interface Errors {
    [key: string]: string[];
}

export interface Touched {
    [key: string]: boolean;
}

interface FormContextProps {
    questionId: Value;
    setQuestionId?: (fieldName: string, value: any) => void;
    errors: Errors;
    validate?: (fieldName: string) => void;
    touched: Touched;
    setTouched?: (fieldName: string) => void;

}
export const FormContext = createContext<FormContextProps>({
    errors: {},
    touched: {},
    questionId: {},
});

type Validator = (value: any, args?: any) => string;

interface Validation {
    validator: Validator;
    arg?: any;
}
interface ValidationProp {
    [key: string]: Validation | Validation[];
}
export interface SubmitResult {
    success: boolean;
    errors?: Errors;
}

interface Props {
    deleteCaption?: string;
    validationRules?: ValidationProp;
    onDelete: (questionId: Value) => Promise<SubmitResult>;
    successMessage?: string;
    failureMessage?: string;
}
export const Form: FC<Props> = ({
    deleteCaption,
    children,
    validationRules,
    onDelete,
    successMessage = 'Success!',
    failureMessage = 'Something went wrong',
}) => {
    const [questionId, setValues] = useState<Value>({});
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Touched>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const validate = (fieldName: string): string[] => {
        if (!validationRules) {
            return [];
        }
        if (!validationRules[fieldName]) {
            return [];
        }
        const rules = Array.isArray(validationRules[fieldName])
            ? (validationRules[fieldName] as Validation[])
            : ([validationRules[fieldName]] as Validation[]);
        const fieldErrors: string[] = [];
        rules.forEach(rule => {
            const error = rule.validator(questionId[fieldName], rule.arg);
            if (error) {
                fieldErrors.push(error);
            }
        });
        const newErrors = { ...errors, [fieldName]: fieldErrors };
        setErrors(newErrors);
        return fieldErrors;
    };

    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
        if (validateForm()) {
            e.preventDefault();
            setSubmitting(true);
            setSubmitError(false);
            const result = await onDelete(questionId);
            setErrors(result.errors || {});
            setSubmitError(!result.success);
            setSubmitting(false);
            setSubmitted(true);
        }
    };
    const validateForm = () => {
        const newErrors: Errors = {};
        let haveError: boolean = false;
        if (validationRules) {
            Object.keys(validationRules).forEach(fieldName => {
                newErrors[fieldName] = validate(fieldName);
                if (newErrors[fieldName].length > 0) {
                    haveError = true;
                }
            });
        }
        setErrors(newErrors);
        return !haveError;
    };

    return (
        <FormContext.Provider
            value={{
                questionId,
                setQuestionId: (fieldName: string, value: any) => {
                    setValues({ ...questionId, [fieldName]: value });
                },
                errors,
                validate,
                touched,
                setTouched: (fieldName: string) => {
                    setTouched({ ...touched, [fieldName]: true });
                },
            }}
        >
            <form noValidate={true} onSubmit={handleDelete}>
                <fieldset disabled={submitting || (submitted && !submitError)}
                    id="fieldset">
                    {children}
                    <div id="children">
                        <PrimaryButton type="submit">{deleteCaption}</PrimaryButton>
                    </div>
                    {submitted && submitError && (
                        <p id="failure"            >
                            {failureMessage}
                        </p>)}
                    {submitted && !submitError && (
                        <p id="success"            >
                            {successMessage}
                        </p>)}
                </fieldset>
            </form>
        </FormContext.Provider>
    );
};
