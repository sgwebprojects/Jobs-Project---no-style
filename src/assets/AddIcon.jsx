
export default function AddIcon({ color }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 7V17M17 12H7" stroke={color||"black"} strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke={color||"black"} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    )
}
