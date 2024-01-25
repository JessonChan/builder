/*
 * @Author: TuGitee tgb@std.uestc.edu.cn
 * @Date: 2024-01-19 21:53:50
 * @LastEditors: TuGitee tgb@std.uestc.edu.cn
 * @LastEditTime: 2024-01-24 17:22:45
 * @FilePath: \builder\spx-gui\src\class\sound.ts
 * @Description: The class of a sound.
 */
import file from "@/interface/file";
import AssetBase from "./AssetBase";
import { isInstance, getAllFromLocal } from "@/util/class";

/**
 * @class Sound
 * 
 * @author tgb
 * @createDate 2024-01-11
 * 
 * @example
 * // create a sound just with name
 * const snd1 = new Sound("1")
 * // create a sound with all params
 * const snd2 = new Sound("2", [file1, file2], { rate: 1 })
 * 
 * // change any params
 * snd2.name = "3"
 * snd2.config.rate = 2
 * 
 * // provide addFile and removeFile method
 * const file = fileDom.target.files[0]   // typeof file ==> File
 * snd1.addFile(file)
 * snd1.removeFile(file)
 * 
 * // check if an obj is an instance of a sound
 * Sound.isInstance(snd1)  // true
 * Sound.isInstance([snd1, snd2])  // true
 * Sound.isInstance("hello")  // false
 * 
 * // conputed path (depend on the name of the sound)
 * snd1.path  // assets/sounds/1
 * snd2.path  // assets/sounds/3
 * 
 * // computed dir
 * snd2.dir  // { "assets/sounds/3/index.json": { rate: 2 }, "assets/sounds/3/[file1.name]": file1, "assets/sounds/3/[file2.name]": file2 }
 */

export default class Sound extends AssetBase implements file {
    /**
     * The root path of the sounds.
     */
    static ROOT_PATH = "assets/sounds/"

    /**
     * The regular expression of the sound.
     */
    static REG_EXP = new RegExp(`^${Sound.ROOT_PATH}(.+)/(.+)$`);

    /**
     * The name of the sound.
     */
    static NAME = "sound"

    /**
     * Get the store name for the sound.
     * @returns the name of the store
     */
    protected getStoreName(): string {
        return Sound.NAME;
    }

    /**
     * Get all items in the storage.
     * @returns all items in the storage
     */
    static async getAllFromLocal() {
        return await getAllFromLocal(Sound);
    }

    /**
     * @constructor create a new sound
     * @param {string} name the name of the sound
     * @param {File[]} files the files of the sound
     * @param {Record<string, any>} config the config of the sound using json to generate `index.json`
     */
    constructor(name: string, files: File[] = [], config: Record<string, any> = {}) {
        super(name, files, config)
    }

    /**
     * Create a new sound from raw data.
     * @param data the data of the sound
     * @returns the sound instance
     */
    static fromRawData(data: any): Sound {
        return new Sound(data.name, data._files, data.config)
    }

    /**
     * Get the directory of the sound.
     */
    get dir() {
        const dir: Record<string, any> = {}
        dir[`${this.path}/index.json`] = this.config
        for (const file of this.files) {
            dir[`${this.path}/${file.name}`] = file
        }
        return dir
    }

    /**
     * Get the path of the sound.
     */
    get path() {
        return Sound.ROOT_PATH + this.name
    }

    /**
     * Check if an object is an instance of a sound.
     */
    static isInstance(obj: any): boolean {
        return isInstance(obj, Sound);
    }
}