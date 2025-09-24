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
            background-color: #f5f5f5ff;
        }
    `;

    return (
        <Global styles={global} />
    );
}