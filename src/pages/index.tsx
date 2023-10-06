import ArtistsListSnippet from "@/components/landing/ArtistsListSnippet";
import { Artist } from "@/database";
import { IArtist } from "@/interfaces/songs";
import Layout from "@/layout/Layout";
import PageHeaderSection from "@/layout/global/PageHeaderSection";
import RegularSection from "@/layout/global/RegularSection";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const artists = await Artist.findAll({ order: [[ 'name', 'ASC' ]]})
        .then(data => JSON.parse(JSON.stringify(data)))

    return {
        props: {
            artists
        }
    }
}

export default function Home(pageProps: InferGetServerSidePropsType<GetServerSideProps>) {

    const { artists } = pageProps as { artists: IArtist[] }

    return (
        <Layout>
            <PageHeaderSection title="The New Classics" />
            <RegularSection title="La jam de 16 Toneladas">
                <div className="max-w-lg mx-auto">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam labore tempora rerum assumenda numquam voluptas! Fuga odio inventore non fugit dolorem incidunt explicabo cum repellat. Optio dicta fugit cumque odio cum molestias soluta, est distinctio alias possimus qui fugiat harum inventore assumenda facere ducimus, nulla obcaecati numquam repudiandae.</p>
                </div>
            </RegularSection>
            <RegularSection title="Artistas">
                <div className="max-w-2xl mx-auto my-8">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio rerum dicta odit exercitationem recusandae deleniti at repudiandae rem atque ex. Unde porro suscipit error explicabo ab. Eum itaque excepturi nobis sed, sapiente est impedit quod? Saepe nostrum magni exercitationem facilis dicta pariatur, ratione modi iusto laborum. Ipsam illo doloremque culpa!</p>
                </div>
                <ArtistsListSnippet artists={ artists }/>
            </RegularSection>
        </Layout>
    )
}
