import type React from "react";
import { twMerge } from "cn";

export const IconWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => (
	<span aria-hidden="true" className={twMerge("text-lg flex items-center justify-center", className)}>
		{children}
	</span>
);

export const CheckIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M20.707 6.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L10 15.586l9.293-9.293a1 1 0 0 1 1.414 0"
		/>
	</svg>
);

export const CheckCircleIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
		/>
	</svg>
);

export const CloseIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
		/>
	</svg>
);

export const CloseCircleIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none">
			<path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
			<path
				fill="currentColor"
				d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16M9.879 8.464L12 10.586l2.121-2.122a1 1 0 1 1 1.415 1.415l-2.122 2.12l2.122 2.122a1 1 0 0 1-1.415 1.415L12 13.414l-2.121 2.122a1 1 0 0 1-1.415-1.415L10.586 12L8.465 9.879a1 1 0 0 1 1.414-1.415"
			/>
		</g>
	</svg>
);

export const InfoCircleIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
			<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01" />
			<path d="M11 12h1v4h1" />
		</g>
	</svg>
);

export const WarningCircleIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeWidth={2}>
			<circle cx={12} cy={12} r={10}></circle>
			<path strokeLinecap="round" d="M12 7v6m0 3.5v.5" />
		</g>
	</svg>
);

export const WarningTriangleIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12">
		<path d="M0 0h12v12H0z" fill="none" />
		<path
			fill="currentColor"
			d="M4.283 1.973c.777-1.297 2.655-1.297 3.432 0l2.997 5.005c.798 1.332-.162 3.027-1.716 3.027H3.003c-1.554 0-2.514-1.694-1.716-3.027zm2.574.513a1 1 0 0 0-1.715 0L2.144 7.491a1 1 0 0 0 .859 1.514h5.993a1 1 0 0 0 .858-1.514zM6 6.75a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5M6 3.5a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"
		/>
	</svg>
);

export const SparklesIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="none"
			stroke="currentColor"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M3 12c4.5 0 9-4.5 9-9c0 4.5 4.5 9 9 9c-4.5 0-9 4.5-9 9c0-4.5-4.5-9-9-9Zm-1 7.5c.833 0 2.5-1.667 2.5-2.5c0 .833 1.667 2.5 2.5 2.5c-.833 0-2.5 1.667-2.5 2.5c0-.833-1.667-2.5-2.5-2.5ZM16 5c1 0 3-2 3-3c0 1 2 3 3 3c-1 0-3 2-3 3c0-1-2-3-3-3Z"
		/>
	</svg>
);

export const SearchIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"
		/>
	</svg>
);

export const FilterIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path fill="currentColor" d="M3 5h18v2H3zm2.5 6h13v2h-13zM8 17h8v2H8z" />
	</svg>
);

export const MobileMenuIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
		<path d="M0 0h16v16H0z" fill="none" />
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M13.5 11a.75.75 0 0 0 0-1.5h-11a.75.75 0 0 0 0 1.5zm0-4.5a.75.75 0 0 0 0-1.5h-11a.75.75 0 0 0 0 1.5z"
			clipRule="evenodd"
		/>
	</svg>
);

export const HomeIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path d="M0 0h24v24H0z" fill="none" />
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M4.825 11h3.38c.121 0 .32 0 .502.016c.225.02.609.076 1.015.303a2.5 2.5 0 0 1 .96.96c.226.405.282.789.302 1.014c.017.183.016.381.016.502v5.41c0 .121 0 .32-.016.502c-.02.225-.075.609-.303 1.015a2.5 2.5 0 0 1-.96.96a2.5 2.5 0 0 1-1.014.302C8.524 22 8.326 22 8.205 22h-3.41c-.12 0-.32 0-.502-.016a2.5 2.5 0 0 1-1.014-.303a2.5 2.5 0 0 1-.96-.96a2.5 2.5 0 0 1-.303-1.014C2 19.524 2 19.326 2 19.205v-5.41c0-.12 0-.32.016-.502c.02-.225.076-.609.303-1.014a2.5 2.5 0 0 1 .96-.96a2.5 2.5 0 0 1 1.014-.303C4.476 11 4.674 11 4.795 11zm-.761 2.256C4 13.37 4 13.52 4 13.826v5.35c0 .303 0 .455.064.568a.5.5 0 0 0 .192.192c.114.064.265.064.569.064h3.35c.304 0 .456 0 .57-.064a.5.5 0 0 0 .191-.192C9 19.631 9 19.48 9 19.175v-5.35c0-.304 0-.455-.064-.57a.5.5 0 0 0-.192-.191C8.631 13 8.48 13 8.175 13h-3.35c-.304 0-.455 0-.57.064a.5.5 0 0 0-.191.192M4.825 2h3.38c.121 0 .32 0 .502.016c.225.02.609.076 1.015.303a2.5 2.5 0 0 1 .96.96c.226.405.282.789.302 1.014c.017.183.016.381.016.502v2.41c0 .121 0 .32-.016.502c-.02.225-.075.609-.303 1.015a2.5 2.5 0 0 1-.96.96a2.5 2.5 0 0 1-1.014.302c-.183.017-.381.016-.502.016h-3.41c-.12 0-.32 0-.502-.016a2.5 2.5 0 0 1-1.014-.303a2.5 2.5 0 0 1-.96-.96a2.5 2.5 0 0 1-.303-1.014C2 7.524 2 7.326 2 7.205v-2.41c0-.12 0-.32.016-.502c.02-.225.076-.609.303-1.014a2.5 2.5 0 0 1 .96-.96a2.5 2.5 0 0 1 1.014-.303C4.476 2 4.674 2 4.795 2zm-.761 2.256C4 4.37 4 4.52 4 4.825v2.35c0 .304 0 .456.064.57a.5.5 0 0 0 .192.191C4.37 8 4.52 8 4.825 8h3.35c.304 0 .456 0 .57-.064a.5.5 0 0 0 .191-.192C9 7.631 9 7.48 9 7.175v-2.35c0-.304 0-.455-.064-.57a.5.5 0 0 0-.192-.191C8.631 4 8.48 4 8.175 4h-3.35c-.304 0-.455 0-.57.064a.5.5 0 0 0-.191.192M15.825 13h3.38c.121 0 .32 0 .502-.016c.225-.02.609-.075 1.015-.303a2.5 2.5 0 0 0 .96-.96c.227-.405.282-.789.302-1.014c.016-.183.016-.381.016-.502v-5.41c0-.12 0-.32-.016-.502a2.5 2.5 0 0 0-.303-1.014a2.5 2.5 0 0 0-.96-.96a2.5 2.5 0 0 0-1.014-.303C19.524 2 19.326 2 19.205 2h-3.41c-.12 0-.32 0-.502.016c-.225.02-.609.076-1.014.303a2.5 2.5 0 0 0-.96.96a2.5 2.5 0 0 0-.303 1.014C13 4.476 13 4.674 13 4.795v5.41c0 .121 0 .32.016.502c.02.225.076.609.303 1.015a2.5 2.5 0 0 0 .96.96c.405.226.789.282 1.014.302c.183.017.381.016.502.016zm-.761-2.256C15 10.63 15 10.48 15 10.175v-5.35c0-.304 0-.455.064-.57a.5.5 0 0 1 .192-.191C15.37 4 15.52 4 15.826 4h3.35c.303 0 .455 0 .568.064a.5.5 0 0 1 .192.192c.064.114.064.265.064.569v5.35c0 .304 0 .455-.064.57a.5.5 0 0 1-.192.191c-.113.064-.265.064-.569.064h-3.35c-.304 0-.455 0-.57-.064a.5.5 0 0 1-.191-.192M15.825 22h3.38c.121 0 .32 0 .502-.016c.225-.02.609-.076 1.015-.303a2.5 2.5 0 0 0 .96-.96c.227-.405.282-.789.302-1.014c.016-.183.016-.381.016-.502v-2.41c0-.12 0-.32-.016-.502a2.5 2.5 0 0 0-.303-1.014a2.5 2.5 0 0 0-.96-.96a2.5 2.5 0 0 0-1.014-.303C19.524 14 19.326 14 19.205 14h-3.41c-.12 0-.32 0-.502.016c-.225.02-.609.076-1.014.303a2.5 2.5 0 0 0-.96.96a2.5 2.5 0 0 0-.303 1.014c-.016.183-.016.381-.016.502v2.41c0 .121 0 .32.016.502c.02.225.076.609.303 1.015a2.5 2.5 0 0 0 .96.96c.405.227.789.282 1.014.302c.183.016.381.016.502.016zm-.761-2.256C15 19.631 15 19.48 15 19.175v-2.35c0-.304 0-.455.064-.57a.5.5 0 0 1 .192-.191c.114-.064.265-.064.57-.064h3.35c.303 0 .455 0 .568.064c.08.045.147.111.192.192c.064.114.064.265.064.57v2.35c0 .303 0 .455-.064.568a.5.5 0 0 1-.192.192c-.113.064-.265.064-.569.064h-3.35c-.304 0-.455 0-.57-.064a.5.5 0 0 1-.191-.192"
			clipRule="evenodd"
		/>
	</svg>
);

export const ProductContainerIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M5 22q-.825 0-1.412-.587T3 20V8.725q-.45-.275-.725-.712T2 7V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v3q0 .575-.275 1.013T21 8.724V20q0 .825-.587 1.413T19 22zM5 9v11h14V9zM4 7h16V4H4zm5 7h6v-2H9zm3 .5"
		/>
	</svg>
);

export const ProductIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048">
		<path
			fill="currentColor"
			d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354zm0 640l177-89l-463-265l-211 106zm315-157l182-91l-497-249l-149 75zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288zm-640 710v-455l-384-192v454zm64-566l369-184l-369-185l-369 185zm576-1l448-224l448 224v527l-448 224l-448-224zm384 576v-305l-256-128v305zm384-128v-305l-256 128v305zm-320-288l241-121l-241-120l-241 120z"
		/>
	</svg>
);

export const RestockProductIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M18 11.18V10h2v1.03c-.16-.03-.33-.03-.5-.03c-.5 0-1 .07-1.5.18m-3 .32c0-.28-.22-.5-.5-.5h-5c-.28 0-.5.22-.5.5V13h5.82l.18-.18zM6 19v-9H4v11h10.03c-.39-.61-.68-1.28-.85-2zM21 9H3V3h18zm-2-4H5v2h14zm0 8.5V12l-2.25 2.25L19 16.5V15a2.5 2.5 0 0 1 2.5 2.5c0 .4-.09.78-.26 1.12l1.09 1.09c.42-.63.67-1.39.67-2.21c0-2.21-1.79-4-4-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5c0-.4.09-.78.26-1.12l-1.09-1.09c-.42.63-.67 1.39-.67 2.21c0 2.21 1.79 4 4 4V23l2.25-2.25L19 18.5z"
		/>
	</svg>
);

export const EmptyProductIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="m8.2 5l-2-2H21v6h-8.8l-2-2H19V5zM20 16.8V10h-2v4.8zm0 2.55v-.01l-2-2v.01L9.66 9l-2-2l-1.53-1.53l-3.74-3.74L1.11 3L3 4.89V9h4.11l10 10H6v-9H4v11h15.11l1.73 1.73l1.27-1.27z"
		/>
	</svg>
);

export const EmptyBoxIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M20 3H4a2 2 0 0 0-2 2v2a2 2 0 0 0 1 1.72V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.72A2 2 0 0 0 22 7V5a2 2 0 0 0-2-2M4 5h16v2H4zm1 14V9h14v10z"
		/>
		<path fill="currentColor" d="M8 11h8v2H8z" />
	</svg>
);

export const EmptyListIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048">
		<path
			fill="currentColor"
			d="M640 768v128H512V768zm896 0v128H768V768zM512 1280v-128h128v128zm256 0v-128h768v128zM640 384v128H512V384zm896 0v128H768V384zM384 128v1536h896v128H256V0h1536v1280h-128V128zm1645 1389l-211 211l211 211l-90 90l-211-211l-211 211l-90-90l211-211l-211-211l90-90l211 211l211-211z"
		/>
	</svg>
);

export const PlusIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h7m7 0h-7m0 0V5m0 7v7" />
	</svg>
);

export const ChevronDownIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 8.5a18 18 0 0 0-7 7a18 18 0 0 0-7-7"
		/>
	</svg>
);

export const ChevronLeftIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15.5 19a18 18 0 0 0-7-7a18 18 0 0 0 7-7"
		/>
	</svg>
);

export const ChevronRightIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M8.5 19a18 18 0 0 1 7-7a18 18 0 0 1-7-7"
		/>
	</svg>
);

export const ArrowLeftIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M22 12H2m7.5 8a15.46 15.46 0 0 0-5.334-6.493L2 12l2.166-1.507A15.46 15.46 0 0 0 9.5 4"
		/>
	</svg>
);

export const ArrowRightIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M2 12h20m-7.5-8a15.46 15.46 0 0 0 5.334 6.493L22 12l-2.166 1.507A15.46 15.46 0 0 0 14.5 20"
		/>
	</svg>
);

export const EditProductIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M18 12.13V10h2v.3c-.22.12-.43.26-.61.44zM9.5 11c-.28 0-.5.22-.5.5V13h6v-1.5c0-.28-.22-.5-.5-.5zM6 10H4v11h7v-1.87l.13-.13H6zm15-1H3V3h18zm-2-4H5v2h14zm-6 14.96V22h2.04l6.13-6.12l-2.04-2.05zm9.85-6.49l-1.32-1.32c-.2-.2-.53-.2-.72 0l-.98.98l2.04 2.04l.98-.98c.2-.19.2-.52 0-.72"
		/>
	</svg>
);

export const VisibleIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M21.92 11.6C19.9 6.91 16.1 4 12 4s-7.9 2.91-9.92 7.6a1 1 0 0 0 0 .8C4.1 17.09 7.9 20 12 20s7.9-2.91 9.92-7.6a1 1 0 0 0 0-.8M12 18c-3.17 0-6.17-2.29-7.9-6C5.83 8.29 8.83 6 12 6s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6m0-10a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
		/>
	</svg>
);

export const WalletIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
			<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
			<path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
		</g>
	</svg>
);

export const AnalyticsIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
			<path d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm4 15h10m-8-4v4m6-4v4" />
			<path d="m8 12l3-3l2 2l3-3" />
		</g>
	</svg>
);

export const StoreIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeWidth={2.2}>
			<path d="M3 10.987v4.506c0 2.831 0 4.247.879 5.127c.878.88 2.293.88 5.121.88h6c2.828 0 4.243 0 5.121-.88c.88-.88.88-2.296.88-5.128v-4.505" />
			<path strokeLinecap="round" d="M15 16.977c-.684.607-1.773 1-3 1s-2.316-.393-3-1" />
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17.796 2.503L6.15 2.532c-1.738-.09-2.184 1.25-2.184 1.906c0 .586-.075 1.44-1.14 3.045c-1.066 1.605-.986 2.082-.385 3.194c.498.922 1.766 1.282 2.428 1.343c2.1.048 3.122-1.768 3.122-3.045c1.042 3.207 4.005 3.207 5.325 2.84c1.323-.367 2.456-1.682 2.723-2.84c.156 1.44.63 2.279 2.027 2.856c1.449.597 2.694-.316 3.319-.902c.625-.585 1.026-1.885-.088-3.314c-.768-.985-1.088-1.913-1.194-2.875c-.06-.558-.114-1.157-.506-1.538c-.572-.557-1.393-.726-1.801-.7"
			/>
		</g>
	</svg>
);

export const CellularWifiNetworkIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}>
			<path d="M12 12v8m-.5-12.937q.24-.062.5-.063a2 2 0 0 1 1.937 2.5M2 2l20 20" />
			<path
				strokeLinejoin="round"
				d="M16.959 6C17.619 6.87 18 7.898 18 9s-.381 2.13-1.041 3M7.04 12C6.381 11.13 6 10.102 6 9c0-.704.156-1.378.44-2m13.876-3C21.38 5.43 22 7.15 22 9s-.62 3.57-1.684 5M3.684 4C2.62 5.43 2 7.15 2 9s.62 3.57 1.684 5"
			/>
		</g>
	</svg>
);

export const CellularWifiNetwork2Icon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
		<path
			fill="currentColor"
			d="M92 152v48a12 12 0 0 1-24 0v-48a12 12 0 0 1 24 0m-52 28a12 12 0 0 0-12 12v8a12 12 0 0 0 24 0v-8a12 12 0 0 0-12-12m176.88 27.93l-160-176a12 12 0 1 0-17.76 16.14L108 123.84V200a12 12 0 0 0 24 0v-49.76l16 17.6V200a12 12 0 0 0 24 0v-5.76l27.12 29.83a12 12 0 0 0 17.76-16.14M160 115.74a12 12 0 0 0 12-12V72a12 12 0 0 0-24 0v31.74a12 12 0 0 0 12 12m40 44a12 12 0 0 0 12-12V32a12 12 0 0 0-24 0v115.74a12 12 0 0 0 12 12"
		/>
	</svg>
);

export const TrendUpIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
		<path
			fill="currentColor"
			d="M240 56v64a8 8 0 0 1-16 0V75.31l-82.34 82.35a8 8 0 0 1-11.32 0L96 123.31l-66.34 66.35a8 8 0 0 1-11.32-11.32l72-72a8 8 0 0 1 11.32 0L136 140.69L212.69 64H168a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8"
		/>
	</svg>
);

export const RefreshIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
			<path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16m-1-4C2 6 6.39 2 11.807 2C16.208 2 19.758 4.335 21 8" />
			<path d="m7 17l-4-1l-1 4M17 7l4 1l1-4" />
		</g>
	</svg>
);

export const StarFilledIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
		<path
			fill="currentColor"
			d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327l4.898.696c.441.062.612.636.282.95l-3.522 3.356l.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
		/>
	</svg>
);

export const ProfileIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path d="M0 0h24v24H0z" fill="none" />
		<g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
			<path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
			<path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21" />
		</g>
	</svg>
);

export const LogoutIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path d="M0 0h24v24H0z" fill="none" />
		<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
			<path d="M18.5 4.4A9.96 9.96 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10a9.96 9.96 0 0 0 6.5-2.4" />
			<path d="M18 8s4 2.946 4 4s-4 4-4 4m3.5-4H9" />
		</g>
	</svg>
);
