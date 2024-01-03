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
    } else if(token && localTeamId)
    {
        try {
            const response = await fetch(uri, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return { props: {} };
            } else {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                };
            }
        } catch (error) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
    }

    return { props: {} };
};
