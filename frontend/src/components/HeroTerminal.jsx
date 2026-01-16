import React from 'react';
import Typewriter from 'typewriter-effect';

const HeroTerminal = () => {
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl font-mono text-tech-green border border-gray-700 w-full max-w-2xl mx-auto mb-12">
            <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-start">
                <span className="mr-2 text-blue-400 shrink-0">sergio@dev:~$</span>
                <div className="min-h-[24px]">
                    <Typewriter
                        options={{
                            strings: [
                                'python manage.py runserver',
                                'terraform apply -auto-approve',
                                'docker-compose up -d',
                                'echo "Hola, soy Sergio Briones"'
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                            deleteSpeed: 30,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroTerminal;
