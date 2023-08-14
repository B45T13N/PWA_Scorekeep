import './Connexion.scss'
function Connexion() {
    return (
        <div className={"connexion-form"}>
            <form action="">
                <div>
                    <label htmlFor="email">Votre email</label>
                    <input type="text" id={"email"} />
                </div>
                <div>
                    <label htmlFor="password">Votre mot de passe</label>
                    <input type="password" id={"password"} />
                </div>
                <div>
                    <input type={"button"} value={"Mot de passe oublié"}/>
                    <input type={"submit"} value={"Valider"}/>
                </div>
            </form>
        </div>
    )
}

export default Connexion