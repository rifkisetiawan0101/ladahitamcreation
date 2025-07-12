// src/components/public/CircularLoader.tsx

const CircularLoader = () => {
    return (
        <svg className="circular-loader" viewBox="0 0 100 100">
            {/* Jalur abu-abu di belakang */}
            <circle className="loader-track" cx="50" cy="50" r="46" />
            {/* Garis progres yang akan dianimasikan */}
            <circle className="loader-progress" cx="50" cy="50" r="46" />
        </svg>
    );
};

export default CircularLoader;