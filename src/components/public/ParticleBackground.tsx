"use client";

import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (_container?: Container): Promise<void> => {};

    const particleOptions: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: '#171717', // neutral-950
                },
            },
            fpsLimit: 50,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: 'grab',
                    },
                    resize: {
                        enable: true,
                    },
                },
                modes: {
                    grab: {
                        distance: 180,
                        links: {
                            opacity: 0.75,
                            color: '#fcd34d' // amber-300
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: '#fcd34d',
                },
                links: {
                    color: '#fcd34d',
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                collisions: {
                    enable: true,
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce',
                    },
                    random: true,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 50,
                },
                opacity: {
                    value: { min: 0.05, max: 0.5 },
                    animation: { 
                        enable: true,
                        speed: 0.8,
                        sync: false,
                        startValue: "random",
                        destroy: "none",
                    },
                },
                shape: {
                    type: 'triangle',
                },
                size: {
                    value: { min: 1, max: 3 },
                    animation: { 
                        enable: true,
                        speed: 0.5,
                        sync: false,
                        startValue: "random",
                        destroy: "none",
                    },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={particleOptions}
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    zIndex: -10,
                }}
            />
        );
    }

    return <></>;
};

export default ParticleBackground;