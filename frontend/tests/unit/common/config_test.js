import assert from "assert";
import Config from "common/config";
import MockAdapter from "axios-mock-adapter";
import Api from "common/api";

const mock = new MockAdapter(Api);

mock
    .onGet("config").reply(200,  {fromServer: "yes"});

describe("common/config", () => {
    it("should get all config values",  () => {
        const storage = window.localStorage;
        const values = {name: "testConfig", year: "2300"};

        const config = new Config(storage, values);
        const result = config.getValues();
        assert.equal(result.name, "testConfig");
    });

    it("should set multiple config values",  () => {
        const storage = window.localStorage;
        const values = {country: "Germany", city: "Hamburg"};
        const newValues = {new: "xxx", city: "Berlin"};
        const config = new Config(storage, values);
        assert.equal(config.values.new, undefined);
        assert.equal(config.values.city, "Hamburg");
        config.setValues();
        assert.equal(config.values.new, undefined);
        assert.equal(config.values.city, "Hamburg");
        config.setValues(newValues);
        const result = config.getValues();
        assert.equal(result.city, "Berlin");
        assert.equal(result.new, "xxx");
        assert.equal(result.country, "Germany");
    });

    it("should store values",  () => {
        const storage = window.localStorage;
        const values = {country: "Germany", city: "Hamburg"};
        const config = new Config(storage, values);
        assert.equal(config.storage["config"], undefined);
        config.storeValues();
        assert.equal(config.storage["config"], "{\"country\":\"Germany\",\"city\":\"Hamburg\"}");
    });

    it("should set and get single config value",  () => {
        const storage = window.localStorage;
        const values = {};

        const config = new Config(storage, values);
        config.setValue("city", "Berlin");
        const result = config.getValue("city");
        assert.equal(result, "Berlin");
    });

    it("should pull from server",  async() => {
        const storage = window.localStorage;
        const values = {name: "testConfig", year: "2300"};

        const config = new Config(storage, values);
        const result = config.getValues();
        assert.equal(result.name, "testConfig");
        assert.equal(config.values.fromServer, undefined);
        await config.pullFromServer();
        assert.equal(config.values.fromServer, "yes");
    });
});