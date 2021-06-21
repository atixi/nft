import Header from "/Components/header";
import Footer from "/Components/footer";
import Head from 'next/head'
const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Rim Entertainment</title>
                <meta name="description" content="Rim Entertainment inc" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {children}
            <Footer />

        </>
    )
}

export default Layout