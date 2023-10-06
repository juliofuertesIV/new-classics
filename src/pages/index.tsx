import Layout from "@/layout/Layout";
import PageHeaderSection from "@/layout/global/PageHeaderSection";
import RegularSection from "@/layout/global/RegularSection";

export default function Home() {

    return (
        <Layout>
            <PageHeaderSection title="The New Classics" />
            <RegularSection title="La jam de 16 Toneladas">
                <div className="max-w-lg mx-auto">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam labore tempora rerum assumenda numquam voluptas! Fuga odio inventore non fugit dolorem incidunt explicabo cum repellat. Optio dicta fugit cumque odio cum molestias soluta, est distinctio alias possimus qui fugiat harum inventore assumenda facere ducimus, nulla obcaecati numquam repudiandae.</p>
                </div>
            </RegularSection>
        </Layout>
    )
}
