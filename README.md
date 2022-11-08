# leave-app

## Text Input ref handling

const testRef: React.LegacyRef<TextInput> = React.createRef();

onSubmitEditing={() => {
if (testRef && testRef.current) {
testRef.current.focus();
}
}}
