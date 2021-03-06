import assert from "assert";
import Clipboard from "common/clipboard";
import Photo from "model/photo";
import Album from "model/album";

describe("common/clipboard", () => {
    it("should construct clipboard",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        assert.equal(clipboard.storageKey, "clipboard");
        assert.equal(clipboard.selection, "");
    });

    it("should toggle model",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.toggle();
        assert.equal(clipboard.storageKey, "clipboard");
        assert.equal(clipboard.selection, "");
        //TO DO assert for not a model log

        const values = {ID: 5, PhotoTitle: "Crazy Cat", PhotoColor: "brown"};
        const photo = new Photo(values);
        clipboard.toggle(photo);
        assert.equal(clipboard.selection[0], 5);
        const values2 = {ID: 8, PhotoTitle: "Crazy Cat", PhotoColor: "brown"};
        const photo2 = new Photo(values2);
        clipboard.toggle(photo2);
        assert.equal(clipboard.selection[0], 5);
        assert.equal(clipboard.selection[1], 8);
        clipboard.toggle(photo);
        assert.equal(clipboard.selection[0], 8);
    });

    it("should toggle id",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.toggleId(3);
        assert.equal(clipboard.selection[0], 3);
        clipboard.toggleId(3);
        assert.equal(clipboard.selection, "");
    });

    it("should add model",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.add();
        assert.equal(clipboard.storageKey, "clipboard");
        assert.equal(clipboard.selection, "");
        //TO DO assert for not a model log

        const values = {ID: 5, PhotoTitle: "Crazy Cat", PhotoColor: "brown"};
        const photo = new Photo(values);
        clipboard.add(photo);
        assert.equal(clipboard.selection[0], 5);
        clipboard.add(photo);
        assert.equal(clipboard.selection[0], 5);
    });

    it("should add id",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.addId(99);
        assert.equal(clipboard.selection[0], 99);
    });

    it("should test whether clipboard has model",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.has();
        assert.equal(clipboard.storageKey, "clipboard");
        assert.equal(clipboard.selection, "");
        //TO DO assert for not a model log

        const values = {ID: 5, PhotoTitle: "Crazy Cat", PhotoColor: "brown"};
        const photo = new Photo(values);
        clipboard.add(photo);
        assert.equal(clipboard.selection[0], 5);
        const result = clipboard.has(photo);
        assert.equal(result, true);
        const values2 = {id: 5, AlbumName: "Christmas 2019", AlbumSlug: "christmas-2019", AlbumUUID: 66};
        const album = new Album(values2);
        const result2 = clipboard.has(album);
        assert.equal(result2, false);
    });

    it("should test whether clipboard has id",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.addId(77);
        assert.equal(clipboard.hasId(77), true);
        assert.equal(clipboard.hasId(78), false);
    });

    it("should remove model",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.remove();
        assert.equal(clipboard.storageKey, "clipboard");
        assert.equal(clipboard.selection, "");
        //TO DO assert for not a model log

        const values = {ID: 5, PhotoTitle: "Crazy Cat", PhotoColor: "brown"};
        const photo = new Photo(values);
        clipboard.add(photo);
        assert.equal(clipboard.selection[0], 5);

        clipboard.remove(photo);
        assert.equal(clipboard.selection, "");
        const values2 = {id: 5, AlbumName: "Christmas 2019", AlbumSlug: "christmas-2019", AlbumUUID: 66};
        const album = new Album(values2);
        clipboard.remove(album);
        assert.equal(clipboard.selection, "");
    });

    it("should set and get ids",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.setIds(8);
        assert.equal(clipboard.selection, "");
        clipboard.setIds([5, 6, 9]);
        assert.equal(clipboard.selection[0], 5);
        assert.equal(clipboard.selection[2], 9);
        const result = clipboard.getIds();
        assert.equal(result[1], 6);
        assert.equal(result.length, 3);
    });

    it("should clear",  () => {
        const storage = window.localStorage;
        const key = "clipboard";

        const clipboard = new Clipboard(storage, key);
        clipboard.clear();
        clipboard.setIds([5, 6, 9]);
        assert.equal(clipboard.selection[0], 5);
        clipboard.clear();
        assert.equal(clipboard.selection, "");
    });

});