import * as yup from "yup"
import { createForm } from "svelte-forms-lib";
import { writable } from "svelte/store";

/**
 * This function will be called on a successful form submission.
 * @param values The submitted data as an object of name/value pairs
 */
const onSubmit = (values) => {
  alert(JSON.stringify(values));
}

export const nodeTypes = [
  { value: "mesh", label: "Mesh (no router)" },
  { value: "hub", label: "Hub (router + radio)" },
];

// Convert NaN values to null in schema
const NaNTransform = (val) => isNaN(parseFloat(val)) ? null : val;

/**
 * MAIN FORM FIELDS OBJECT (source of truth)
 */
export const formFields = [
  {
    key: "nodeLabel",
    label: "Node Label",
    value: null,
    type: yup.string(),
    display: val => val,
  },
  {
    key: "nodeType",
    label: "Node Type",
    value: null,
    type: yup.string()
      .oneOf(nodeTypes.map((t) => t.value)),
    display: val => nodeTypes.find(type => type.value == val)?.label ?? val,
  },
  {
    key: "installers",
    label: "Installer(s)",
    value: null,
    type: yup.array().min(1),
    display: val => val?.map(email => `<span class="email">${email}</span>`).join(" ") ?? null,
  },
  {
    key: "device",
    label: "Device",
    value: null,
    type: yup.string().min(1),
    display: val => val,
  },
  {
    key: "lat",
    label: "Latitude",
    value: null,
    type: yup.number().transform(NaNTransform).moreThan(-90).lessThan(90),
    display: val => val,
  },
  {
    key: "long",
    label: "Longitude",
    value: null,
    type: yup.number().transform(NaNTransform).moreThan(-90).lessThan(90),
    display: val => val,
  },
  {
    key: "angle",
    label: "Angle",
    value: null,
    type: yup.number().transform(NaNTransform).moreThan(0).lessThan(360),
    display: val => val + "°",
  },
]

// Extract type schemas
const validationSchema = yup
  .object()
  .shape(
    Object.fromEntries(
      formFields.map((field) => ([
        field.key,
        field.type
          .label(field.label)
          .nullable()
          .required()
      ]))
    )
  );
// Extract initial values
const initialValues = Object.fromEntries(formFields.map((field) => [field.key, field.value]));

// Create svelte-forms-lib form with fields
export const {
  form,
  handleSubmit,
  handleChange,
  validateField,
  isValid,
  errors,
} = createForm({
  validationSchema,
  initialValues,
  onSubmit,
});

// Steps for multi-step form

export const steps = ["Info", "Location", "Direction", "Review"];
export const currentActive = writable(0);