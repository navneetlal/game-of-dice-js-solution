import readline from 'readline-sync';

export const print = (type: 'log' | 'table' | 'error' | 'info', message: string | Object) => console[type](message);
export const prompt = (message: string) => readline.question(message);
