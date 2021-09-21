'use strict';

const expect = require('expect.js');
const sinon = require('sinon');
const StaffService = require('../../src/services/staff_service');

// Author is not intentionally writing all test case
// These test case is just sample of implementation how author will write the test on this project

describe('Staff Service', () => {
    let sandbox;
    let staffDAOStub;
    let staffService;

    before(() => {
        sandbox = sinon.createSandbox();

        staffDAOStub = {
            create: sandbox.stub()
        };

        staffService = new StaffService({
            staffDAO: staffDAOStub
        });
    });

    afterEach(() => {
        sandbox.reset();
    });

    describe('createStaff', () => {
        describe('Success scenario', () => {
            const reqData = {
                name: 'the name',
                address: 'the address',
                work_area: 'sewing'
            };

            before(() => {
                const DAOresult = {
                    ...reqData,
                    id: '123'
                };

                staffDAOStub.create.resolves(DAOresult);
            });
            it('should return object when create staff pass', async () => {
        
                const serviceResult = await staffService.createStaff(reqData);

                expect(serviceResult).to.be.an('object');
            });
        });

        describe('Failed scenario', () => {
            const reqData = {
                name: 'the name',
                address: 'the address',
                work_area: 'sewing'
            };

            before(() => {
                staffDAOStub.create.rejects(new Error('DB locked to 1 process'));
            });

            it('should throw error object when create staff DB record error', async () => {
                try {
                    await staffService.createStaff(reqData);

                    throw 'test doesnt throw an error';
                } catch (error) {
                    expect(error.error_code).to.be.equal('INTERNAL_SERVER_ERROR');
                    expect(error.message).to.be.equal('Unable to create staff data');
                }
            });
        });
    });
});