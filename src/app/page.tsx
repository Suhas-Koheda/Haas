import Name from "@/components/Name";
import {ContributionsPage} from "@/components/Contributions";
import Skills from "@/components/Skills";

export default function Home(){
    return (
        <div className={""}>
            <Name/>
            <ContributionsPage/>
            <Skills/>
        </div>
    )
}