import { object, string, number, boolean } from 'yup';
import NameStep from "./steps/NameStep";
import SettingsStep from "./steps/SettingsStep";
import ReviewStep from "./steps/ReviewStep";
import { STEPS } from '../../constants/steps';

export const stepsConfig = [
    {
        id: STEPS.nameStep.id,
        label: "Select a name",
        description: "A virtual machine requires storage so that you can install an operating system.",
        component: NameStep,
        validationSchema: object({
            name: string().nullable().required("Required field")
                .max(80, `Name is too long`)
        }),
        fields: ['name']
    },
    {
        id: STEPS.settingsStep.id,
        label: "General Settings",
        description: "Configure the virtual machine hardware.",
        component: SettingsStep,
        validationSchema: object({
            cpu: number()
                .nullable()
                .required("Required field")
                .positive("Must be a positive value")
                .max(12, "Number of processors must be up to 12"),
            isVirtualized: boolean().nullable(),
            ram: number()
                .nullable()
                .required("Required field")
                .positive("Must be a positive value")
                .max(50, "Enter memory amount up to 50GB"),
        }),
        fields: ['ram', 'cpu']
    },
    {
        id: STEPS.reviewStep.id,
        description: "Review your settings selection before finishing the wizard.",
        label: "Ready to complete",
        component: ReviewStep,
        fields: []
    },
];
