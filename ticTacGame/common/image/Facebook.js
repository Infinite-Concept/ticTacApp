import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#1977F3"
        d="M20 12c0-4.417-3.583-8-8-8a8.001 8.001 0 0 0-1.25 15.903v-5.59H8.719V12h2.031v-1.762c0-2.005 1.195-3.113 3.022-3.113.875 0 1.79.156 1.79.156V9.25h-1.009c-.994 0-1.303.617-1.303 1.25V12h2.219l-.355 2.313H13.25v5.59A8.001 8.001 0 0 0 20 12Z"
      />
      <Path
        fill="#FEFEFE"
        d="M15.114 14.313 15.47 12H13.25v-1.5c0-.633.31-1.25 1.303-1.25h1.01V7.281s-.916-.156-1.791-.156c-1.827 0-3.022 1.106-3.022 3.113V12H8.719v2.313h2.031v5.59a8.043 8.043 0 0 0 2.5 0v-5.59h1.864Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M4 4h16v16H4z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
