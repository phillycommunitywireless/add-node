import * as yup from "yup"
import { createForm } from "svelte-forms-lib";
import { writable } from "svelte/store";

export const dev = process.env.NODE_ENV == "dev";

export const steps = ["Info", "Location", "Direction", "Review"];
export const currentActive = writable(0);

export const nodeTypes = [
  { value: "mesh", label: "Mesh (no router)" },
  { value: "hub", label: "Hub (router + radio)" },
];

const NaNTransform = (val) => {
  const result = parseFloat(val);
  return isNaN(result) ? null : result;
}

export const formFields = [
  {
    key: "nodeLabel",
    label: "Node Label",
    value: null,
    type: yup.string(),
    display(val) { return val },
  },
  {
    key: "nodeType",
    label: "Node Type",
    value: null,
    type: yup.string()
      .oneOf(nodeTypes.map((t) => t.value)),
    display(val) { return nodeTypes.find(type => type.value == val)?.label ?? val },
  },
  {
    key: "installers",
    label: "Installer(s)",
    value: null,
    type: yup.array().min(1),
    display(val) { return val?.map(email => `<span class="email">${email}</span>`).join(" ") ?? null },
  },
  {
    key: "device",
    label: "Device",
    value: null,
    type: yup.string().min(1),
    display(val) { return val },
  },
  {
    key: "lat",
    label: "Latitude",
    value: null,
    type: yup.number().transform(NaNTransform).moreThan(-90).lessThan(90),
    display(val) { return val },
  },
  {
    key: "long",
    label: "Longitude",
    value: null,
    type: yup.number().transform(NaNTransform).moreThan(-90).lessThan(90),
    display(val) { return val },
  },
  {
    key: "angle",
    label: "Angle",
    value: null,
    type: yup.number().transform(NaNTransform).moreThan(0).lessThan(360),
    display(val) { return val + "°" },
  },
]

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

const initialValues = Object.fromEntries(formFields.map((field) => [field.key, field.value]));

const onSubmit = (values) => {
  alert(JSON.stringify(values));
}

export const {
  form,
  handleSubmit,
  handleChange,
  handleReset,
  errors,
  state,
  touched,
  modified,
  isModified,
  isValid,
  isValidating,
  isSubmitting,
  validateField,
} = createForm({
  validationSchema,
  initialValues,
  onSubmit,
});
