import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "About DevSH";
export const size = {
    width: 256,
    height: 235
}

export default async function OgImage() {
    const logoData = await readFile(
        join(process.cwd(), 'public', 'logo.png')
    );

    const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

    return new ImageResponse(
        (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                background: '#000',
                color: '#fff'
            }}>
                <img src={logoSrc} alt="DevSH Logo"/>
            </div>
        ),
        {
            ...size
        }
    )
}