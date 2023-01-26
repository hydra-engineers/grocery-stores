import axios from 'axios';
import { CoopExports } from '../../../src';
import { Client } from '../../../src/core/utils/client';

const { Coop } = CoopExports;

jest.mock('axios');

axios.create = jest.fn().mockReturnThis();
const requestMock = axios.request as jest.Mock;

describe('Coop client', () => {

    it('should create a instance of Coop', () => {
		const coop = new Coop();
		expect(coop).toBeInstanceOf(Coop)
    });

	it('should be able to access instance of Client', () => {
		const coop = new Coop();
		const client = coop.getClient();
		expect(client).toBeInstanceOf(Client);
	})

    it('should make a GET request', async () => {
        const coop = new Coop();
		const client = coop.getClient();
		requestMock.mockReturnValueOnce({
			statusText: 'OK',
			data: {
				message: 'Hello World'
			}
		});
		const response = await client.get('/');
		expect(response).toStrictEqual({
			message: 'Hello World'
		});
	});

    it('should error from the GET request', async () => {
        const coop = new Coop();
		const client = coop.getClient();
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
        const coop = new Coop({
			verbose: true
		});
		const client = coop.getClient();
        requestMock.mockReturnValueOnce({
			statusText: 'OK'
		});
        await client.get('/');
        expect(logSpy).toHaveBeenCalledTimes(3);
    });

    it('should create default headers', () => {
        const coop = new Coop();
		const client = coop.getClient();
        const headers = client.createHeader();
        expect(headers).toStrictEqual({
            'Content-Type': 'application/json',
            'User-Agent': 'coop-wrapper'
        });
    });

    it('should create properly formatted URL from query', () => {
        const coop = new Coop();
		const client = coop.getClient();
        const url = client.createURL('', { test: 'test' });
        expect(url).toBe('https://api.coop.nl/INTERSHOP/rest/WFS/COOP-2800-Site/?test=test');
    });
});
