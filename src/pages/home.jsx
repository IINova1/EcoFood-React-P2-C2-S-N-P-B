import Hero from '../components/Hero';
import Header from '../components/Header';
import Somos from '../components/Somos'
import QueHacemos from '../components/Que_hacemos';

import { getUserData } from "../services/userService";
import { useAuth } from "../context/AuthContext";


function Home() {
    /*useEffect(() => {
        const fetch = async () => {
            const datos = await getUserData(user.uid);
            setUserData(datos);
        };

        if (user) fetch();
    }, [user]);*/


    return (
        <>
            <Header/>
            <Hero/>
            <Somos/>
            <QueHacemos/>
        </>
    );
}

export default Home;
