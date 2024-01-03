import { GetServerSideProps } from 'next';

export const useAuthRedirect: GetServerSideProps = async (context) => {
    const { req } = context;

    const token = req.cookies.token;
    const localTeamId = req.cookies.localTeamId;
    const uri = process.env.NEXT_PUBLIC_API_SCOREKEEP_URL + '/api/auth/me';

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
