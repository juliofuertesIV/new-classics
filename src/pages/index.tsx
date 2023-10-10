import ArtistsListSnippet from "@/components/landing/ArtistsListSnippet";
import NextJamsSnippet from "@/components/landing/NextJamsSnippet";
import { Artist, Guest, Jam } from "@/database";
import { IJam } from "@/interfaces/jam";
import { IArtist } from "@/interfaces/songs";
import Layout from "@/layout/Layout";
import PageHeaderSection from "@/layout/global/PageHeaderSection";
import RegularSection from "@/layout/global/RegularSection";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const artists = await Artist.findAll({ order: [[ 'name', 'ASC' ]]})
        .then(data => JSON.parse(JSON.stringify(data)))

    const jams = await Jam.findAll({ 
        order: [[ 'date', 'ASC' ]], 
        include: { model: Guest }
    })
    .then(data => JSON.parse(JSON.stringify(data)))

    return {
        props: {
            artists,
            jams
        }
    }
}

export default function Home(pageProps: InferGetServerSidePropsType<GetServerSideProps>) {

    const { artists, jams } = pageProps as { artists: IArtist[], jams: IJam[] }

    return (
        <Layout>
            <PageHeaderSection title="The New Classics">
                <div className="max-w-2xl mx-auto text-center mb-8">
                    <h2>La jam de 16 Toneladas</h2>
                </div>
            </PageHeaderSection>
            <RegularSection title="Próximas jams">
                <p className="max-w-2xl mx-auto mb-12">Solemos estar todos los miércoles en <Link href="https://16toneladas.com" className="underline cursor-pointer hover:text-fuchsia-400">16 Toneladas</Link>, una de las mejores salas de concierto de Valencia. La apertura de puertas suele ser a las 20:30h y aguantamos por ahí hasta las 00h, pero de vez en cuando puede haber cambios en la programación, así que aquí puedes echar un ojo: </p>
                <NextJamsSnippet jams={ jams }/>
            </RegularSection>
            <RegularSection title="Artistas">
                <div className="max-w-2xl mx-auto mb-12">
                    <p>Si vienes a la jam puedes apostarte cien pavos a que vas a escuchar a alguno de estos, que son la base de nuestro repertorio habitual: </p>
                </div>
                <ArtistsListSnippet artists={ artists }/>
            </RegularSection>
        </Layout>
    )
}
