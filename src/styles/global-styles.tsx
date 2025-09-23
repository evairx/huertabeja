"use client";
import { Global, css } from '@emotion/react'

export default function GlobalStyles() {
    const global = css`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #FAF9F6;
        }
    `;

    return (
        <Global styles={global} />
    );
}