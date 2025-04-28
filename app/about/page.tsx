import Link from "next/link"
import { TextBlock, Paragraph } from "../components/TextUtils"
import ContactEmail from "./ContactEmail"

export default function Page() {
    return (
        <div className="container mx-auto max-sm:px-8 flex flex-col gap-4 sm:gap-8 sm:items-center h-full justify-center">
            <h1>About Us</h1>
            <TextBlock>
                <Paragraph>
                    DevSH Graphics Programming (DevSH) sp. z o.o. ( devsh.eu ) is a company specializing in High
                    Performance Computing with a particular focus on Computer Graphics and GPU Programming.
                    Currently boasting a team of 10 Consultants and 3 separate concurrent projects.
                    We offer consulting and co-development to Third Parties with their own products, as well as con-
                    duct our own Research and Development, developing Open-Source Middleware and Libraries.
                </Paragraph>

                <Paragraph>
                    The primary mission for all of our self-funded developments is to advance open source ecosys-
                    tems with innovative tooling, with a particular focus on Vulkan and SPIR-V.
                    We maintain a single source HLSL202x/C++20 Standard Template Header Only Library and our
                    Utility and Rapid Prototyping Framework <Link href="https://github.com/Devsh-Graphics-Programming/Nabla" target="_blank" rel="noopener noreferer" className="no-underline text-teal-600 devsh-link">Nabla</Link> designed {/*this prevents visual bug, "designed must stay here"*/}
                    to give a CUDA-like programming experience in the Vulkan ecosystem.
                </Paragraph>

                <Paragraph>
                    We’ve honed the culture of remote work, since the company’s inception before 2019. Subject to
                    availability of consultants and specific expertise required their regular working hours overlap the
                    normal working hours from San Francisco to Sydney.
                </Paragraph>
            </TextBlock>
            <h1>Contact</h1>
            <TextBlock>
                If you're interested in our offer, you can reach us at this e-mail address: <ContactEmail/>
            </TextBlock>
        </div>
    )
}