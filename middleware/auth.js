export default function auth({store, redirect}) {
    if(!store.state.userToken) {
        redirect("/login")
    }
}