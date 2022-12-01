# leave-app

## Text Input ref handling

const testRef: React.LegacyRef<TextInput> = React.createRef();

onSubmitEditing={() => {
if (testRef && testRef.current) {
testRef.current.focus();
}
}}

-   After installing firebase, if you got pod issue try following steps
    cd ios
    sudo arch -x86_64 gem install ffi
    arch -x86_64 pod install
    arch -x86_64 pod update
