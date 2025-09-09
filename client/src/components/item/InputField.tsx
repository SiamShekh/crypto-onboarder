import { useFormContext } from "react-hook-form";

const InputField = ({ fieldType, fieldPlaceholder, registerKey, maxLength, minLength, className, label, required }: { fieldType?: React.HTMLInputTypeAttribute, fieldPlaceholder?: string, registerKey: string, maxLength?: number, minLength?: number, required?: boolean, className?: string, label: string }) => {

    const { register, formState: { errors, } } = useFormContext();
    
    return (
        <div>
            <p className="text-xs">{label}</p>
            <input
                type={fieldType}
                placeholder={fieldPlaceholder}
                {...register(registerKey, {
                    ...(maxLength && {
                        maxLength: {
                            value: maxLength,
                            message: `Maximum ${maxLength} characters allowed.`
                        }
                    }),
                    ...(minLength && {
                        minLength: {
                            value: minLength,
                            message: `Minimum ${minLength} characters required.`
                        }
                    }),
                    ...(required && {
                        required: {
                            message: `${label} is required`,
                            value: true
                        }
                    }),
                    
                })}
                className={className}
            />
            {errors[registerKey] && (
                <p className="text-xs text-red-500 line-clamp-1 mt-1">{errors[registerKey]?.message as string}</p>
            )}
        </div>
    )
}

export default InputField;