"use client";
import { Global, css } from '@emotion/react'
import { colors } from '@/colors';

export default function GlobalStyles() {
    const global = css`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: var(--primary-color);
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        :root {
            --primary-color: ${colors.primary};
            --secondary-color: ${colors.secondary};
            --bg-primary-color: ${colors.bg_primary};
            --color-black: ${colors.color_black};
            --border-color-loading: ${colors.border_color_loading};
            --border-color-top-loading: ${colors.border_color_top_loading};
            --divider-color: ${colors.divider_color};
        }

        ::-webkit-scrollbar {
            width: 6px;
            height: 8px;
        }

        ::-webkit-scrollbar-button {
            width: 0px;
            height: 0px;
        }

        ::-webkit-scrollbar-thumb {
            background: var(--secondary-color);
            border: 0px none;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: var(--secondary-color);
            opacity: 0.8;
        }

        ::-webkit-scrollbar-thumb:active {
            background: var(--secondary-color);
        }

        ::-webkit-scrollbar-track {
            background: none;
            border: 0px none var(--primary-color);
        }

        ::-webkit-scrollbar-track:hover {
            background: none;
        }

        ::-webkit-scrollbar-track:active {
            background: none;
        }

        ::-webkit-scrollbar-corner {
            background: transparent;
        }
    `;

    return (
        <Global styles={global} />
    );
}