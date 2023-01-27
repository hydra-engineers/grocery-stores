import axios from 'axios';
import { AldiExports } from "../../../src";
const { Aldi } = AldiExports;

jest.mock('axios');

axios.create = jest.fn().mockReturnThis();
const requestMock = axios.request as jest.Mock;

describe('Aldi client', () => {
    it('should create a client object', () => {
        const aldi = new Aldi();
        expect(aldi).toBeDefined();
    });

    it('should create a client with provided options', () => {
        const aldi = new Aldi({
            api_version: 1
        });
        expect(aldi).toBeDefined();
    });

    it('should make a GET request', async () => {
        const aldi = new Aldi();
		const client = aldi.getClient();
        requestMock.mockReturnValueOnce({
            statusText: 'OK',
            data: {
                message: 'Hello World'
            }
        });
        const response = await client.get('/');
        expect(response).toStrictEqual({ message: 'Hello World' });
    });

    it('should error from the GET request', async () => {
        const aldi = new Aldi();
		const client = aldi.getClient();
        requestMock.mockReturnValueOnce({
            statusText: 'Internal Server Error'
        });
        try {
            await client.get('/');
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it('should log the request in the console', async () => {
        const logSpy = jest.spyOn(console, 'log');
        logSpy.mockImplementation(() => {});
        const aldi = new Aldi({
            verbose: true
        });
		const client = aldi.getClient();
        requestMock.mockReturnValueOnce({
            statusText: 'OK'
        });
        await client.get('/');
        expect(logSpy).toHaveBeenCalledTimes(3);
    });

    it('should create default headers', () => {
        const aldi = new Aldi();
		const client = aldi.getClient();
        const headers = client.createHeader();
        expect(headers).toStrictEqual({
            'Content-Type': 'application/json',
            'User-Agent': 'aldi-wrapper'
        });
    });

    it('should create properly formatted URL from query', () => {
        const aldi = new Aldi({ api_version: 1 });
		const client = aldi.getClient();
        const url = client.createURL('', {
            test: 'test'
        });
        expect(url).toBe('https://webservice.aldi.nl/api/v1/?test=test');
    });
});
