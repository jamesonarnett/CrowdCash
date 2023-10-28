import CrowdCashLogo from "../../../public/images/crowdCash.png";

export default function ApplicationLogo({ className = "", ...props }) {
    return (
        <img
            src={CrowdCashLogo}
            alt="CrowdCash Logo"
            className={"h-16 w-auto " + className}
            {...props}
        />
    );
}
