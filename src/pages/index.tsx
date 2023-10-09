import ArtistsListSnippet from "@/components/landing/ArtistsListSnippet";
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

    const jams = await Jam.findAll({ order: [[ 'date', 'ASC' ]]})
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
            <PageHeaderSection title="The New Classics" />
            <RegularSection title="La jam de 16 Toneladas">
                <div className="max-w-2xl mx-auto">
                    <p>Solemos estar todos los miércoles en <Link href="https://16toneladas.com" className="underline cursor-pointer hover:text-fuchsia-700">16 Toneladas</Link>, una de las mejores salas de concierto de Valencia. La apertura de puertas suele ser a las 20:30h y aguantamos por ahí hasta las 00h, pero de vez en cuando puede haber cambios en la programación, así que aquí puedes echar un ojo: </p>
                </div>
                <div className="flex flex-col w-full gap-4 items-center mb-12">
                    <header className="py-8">
                        <h2>Próximas Jams</h2>
                    </header>
                    {
                        jams.map((jam) => {
                            return (
                                <article key={jam.id} className="text-center border w-full px-4 py-2">
                                    <header className="flex gap-4 items-center justify-between">
                                        <h3 className="uppercase mb-2">{ new Date(jam.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</h3>
                                        <p>Apertura de puertas: <b className="font-bold">{ jam.openDoorsTime }h.</b></p>
                                    </header>
                                </article>
                            )
                        })
                    }
                </div>
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
