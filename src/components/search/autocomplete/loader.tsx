
interface Props {

}

export default function Loader({ ...props}: Props): JSX.Element {
    return (
        <svg
            role="img"
            width="100%"
            height="100"
            aria-labelledby="loading-aria"
            viewBox="0 0 100% 100"
            //preserveAspectRatio="align xMinYMin"
        >
            <title id="loading-aria">Loading...</title>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                clipPath="url(#clip-path)"
                style={{fill: 'url("#fill")'}}
            ></rect>
            <defs>
                <clipPath id="clip-path">
                    <rect x="0" y="15" rx="5" ry="5" width="100%" height="20" />
                    <rect x="0" y="45" rx="5" ry="5" width="100%" height="20" />
                    <rect x="0" y="75" rx="5" ry="5" width="100%" height="20" />
                </clipPath>
                <linearGradient id="fill">
                    <stop
                        offset="0.599964"
                        stopColor="#e3e3e3"
                        stopOpacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                    <stop
                        offset="1.59996"
                        stopColor="#dcdbdb"
                        stopOpacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                    <stop
                        offset="2.59996"
                        stopColor="#e3e3e3"
                        stopOpacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="0; 0; 3"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                </linearGradient>
            </defs>
        </svg>
    )
}
