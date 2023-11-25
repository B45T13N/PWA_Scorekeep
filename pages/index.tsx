import '@/pages/index.scss'

export default function Home() {
  return (
    <article className="home-content">
      <h2>Suivez, enregistrez et gérez vos Matchs avec Scorekeep</h2>
      <section className={"main-paragraph"}>
        <p>
          Cette application est dédiée aux associations sportives.
          Elle a été conçue pour répondre à vos besoins en matière de suivi de matchs, d'enregistrement et de
          gestion de la table des matchs.
        </p>
        <p>
          Il est possible pour les membres du bureaux qui le souhaitent d’avoir un compte afin de pouvoir se
          connecter sur ce site. Une fois connecté, il vous sera possible d’enregistrer de nouveaux matchs
          ainsi que de consulter la liste des membres inscrits.
        </p>
        <p>
          L’inscription aux tables de matchs est possible soit via ce site internet, soit via l’application
          mobile du même nom.
        </p>
        <p>
          Une vérification est faite au moment de l’inscription via l’adresse e-mail de la personne
          souhaitant s’inscrire, afin de vérifier que cette dernière disposent d’une licence
          (élement nécessaire pour tenir une table). Cette vérification peut-être faite via un token transmis
          par l'association.
        </p>
        <p>
          Au delà de la gestion des tables de marques, cette application permet aux familles / parents de
          savoir quand un match est joué.
        </p>
      </section>
      <section className={"footer-paragraph"}>
        <p>
          Si toutefois vous souhaitez inscrire votre association afin de bénéficier de cette application, n’hésitez pas à me contacter.
        </p>
        <a href={"mailto:contact@scorekeep.org"} about={"Me contacter par e-mail"}>
          contact@scorekeep.org
        </a>
        <p>
          DoWeDev
        </p>
      </section>
    </article>
  )
}
