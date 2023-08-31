import {readdirSync, readFileSync, } from 'fs'

export interface FileInfo {
    name: string;
    path: string;
}

export const listFiles = (path: string): FileInfo[] => {
    return readdirSync(path).map((name) => {
        return {
            name: name,
            path: `${path}${name}`,
        }
    });
}

export const getBase64 = (file: string) => {
    return readFileSync(file, { encoding: 'base64' });
}