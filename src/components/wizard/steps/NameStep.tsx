import Input from "../../formik/input/Input";
export default function NameStep(): React.JSX.Element {
    return (<Input label="Name" name="name" type="text" hint="Enter unique name up to 80 characters" />);
}
