import Layout from "../components/Sections/Layout";
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import ErrorPage from "../components/404/ErrorPage";


const Custom404 = () => {

    const router = useRouter()

    useEffect(() => {
        const { pathname } = router;
        if (pathname !== pathname.toLowerCase()) {
            router.push(pathname.toLowerCase())
        }
    }, [router])
    return (
        <Layout
            pageTitle="Naxos - Ooops..."
            colorSchema="/assets/colors/blue.css"
        >

            <ErrorPage />


        </Layout>
    )

}

export default Custom404;