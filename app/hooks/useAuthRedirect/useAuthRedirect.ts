import { GetServerSideProps } from 'next';

export const useAuthRedirect: GetServerSideProps = async (context) => {
    const { req } = context;

    const token = req.cookies.token;
    const localTeamId = req.cookies.localTeamId;
    if(token == undefined && localTeamId == undefined)
    {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return { props: {} };
};
