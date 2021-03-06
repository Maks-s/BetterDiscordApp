/**
 * BetterDiscord Permission Manager
 * Copyright (c) 2015-present Jiiks/JsSucks - https://github.com/Jiiks / https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

/* These are Discord's permissions as of March 13th 2019
{
    "CREATE_INSTANT_INVITE": 1,
    "KICK_MEMBERS": 2,
    "BAN_MEMBERS": 4,
    "ADMINISTRATOR": 8,
    "MANAGE_CHANNELS": 16,
    "MANAGE_GUILD": 32,
    "CHANGE_NICKNAME": 67108864,
    "MANAGE_NICKNAMES": 134217728,
    "MANAGE_ROLES": 268435456,
    "MANAGE_WEBHOOKS": 536870912,
    "MANAGE_EMOJIS": 1073741824,
    "VIEW_AUDIT_LOG": 128,
    "VIEW_CHANNEL": 1024,
    "SEND_MESSAGES": 2048,
    "SEND_TSS_MESSAGES": 4096,
    "MANAGE_MESSAGES": 8192,
    "EMBED_LINKS": 16384,
    "ATTACH_FILES": 32768,
    "READ_MESSAGE_HISTORY": 65536,
    "MENTION_EVERYONE": 131072,
    "USE_EXTERNAL_EMOJIS": 262144,
    "ADD_REACTIONS": 64,
    "CONNECT": 1048576,
    "SPEAK": 2097152,
    "MUTE_MEMBERS": 4194304,
    "DEAFEN_MEMBERS": 8388608,
    "MOVE_MEMBERS": 16777216,
    "USE_VAD": 33554432,
    "PRIORITY_SPEAKER": 256
}
*/

const PermissionMap = {
    IDENTIFY: {
        HEADER: 'Access your account information',
        BODY: 'Allows :NAME: to read your account information (excluding user token).'
    },
    NAVIGATION: {
        HEADER: 'Navigate within Discord',
        BODY: 'Allows :NAME: to navigate Discord and open things like user settings.'
    },
    MANAGE_SETTINGS: {
        HEADER: 'Change user settings',
        BODY: 'Allows :NAME: to change Discord setting like light/dark theme and cozy/compact mode.'
    },
    READ_MESSAGES: {
        HEADER: 'Read all messages',
        BODY: 'Allows :NAME: to read all messages accessible through your Discord account.'
    },
    SEND_MESSAGES: {
        HEADER: 'Send messages',
        BODY: 'Allows :NAME: to send messages on your behalf.'
    },
    DELETE_MESSAGES: {
        HEADER: 'Delete messages',
        BODY: 'Allows :NAME: to delete messages on your behalf.'
    },
    EDIT_MESSAGES: {
        HEADER: 'Edit messages',
        BODY: 'Allows :NAME: to edit messages on your behalf.'
    },
    ATTACH_FILES: {
        HEADER: 'Attach files',
        BODY: 'Allows :NAME: to upload files on your behalf.'
    },
    ADD_REACTIONS: {
        HEADER: 'Add reactions',
        BODY: 'Allows :NAME: to add reactions on your behalf.'
    },
    VIEW_SERVERS: {
        HEADER: 'View servers',
        BODY: 'Allows :NAME: to see what servers you are a member of.'
    },
    MANAGE_SERVERS: {
        HEADER: 'Join and leave servers',
        BODY: 'Allows :NAME: to join and leave servers on your behalf.'
    },
    VIEW_CHANNELS: {
        HEADER: 'View channels',
        BODY: 'Allows :NAME: to see what channels you have available.'
    },
    FS_ACCESS: {
        HEADER: 'Access your filesystem',
        BODY: 'Allows :NAME: to read and write files to your computer.'
    },
    VIEW_RELATIONSHIPS: {
        HEADER: 'VIEW your relationships',
        BODY: 'Allows :NAME: to view your friends and blocked users.'
    },
    MANAGE_RELATIONSHIPS: {
        HEADER: 'Manage your relationships',
        BODY: 'Allows :NAME: to add/remove friends, and block/unblock users on your behalf.'
    },
    GET_INSTALLED_COMPONENT: {
        HEADER: 'Use installed components',
        BODY: 'Allows :NAME: to control other plugins / themes / modules'
    }
}

export default class {

    static permissionText(permission) {
        return PermissionMap[permission];
    }

    /**
     * Add the passed permission to the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @param {String} permission Permission to add
     * @return {Promise}
     */
    static add(id, permission) {
        if (!PermissionMap[permission])
            return;

        if (this.get(id, permission))
            return;

        if (!this.data)
            this.data = [];

        if (!this.data[id])
            this.data[id] = [];

        this.data[id].push(permission);
    }

    /**
     * Add all specified permissions to the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @param {Array} permissions Array of permission to add
     * @return {Promise}
     */
    static addMultiple(id, permissions) {
        for (const permission of permissions)
            this.add(id, permission);
    }

    /**
     * Remove the passed permission from the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @param {String} permission Permission to remove
     * @return {Promise}
     */
    static remove(id, permission) {
        if (!this.data || !this.data[id])
            return;

        for (const index in this.data[id]) {
            if (this.data[id][index] === permission) {
                this.data[id].splice(index, 1);
                break;
            }
        }
    }

    /**
     * Remove all permissions from the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @return {Promise}
     */
    static removeAll(id) {
        if (!this.data || !this.data[id])
            return;

        delete this.data[id];
    }

    /**
     * Checks if the plugin with the passed ID has the passed permission
     * @param {String} id Plugin's ID
     * @param {String} permission Permission to check
     * @return {Boolean}
     */
    static get(id, permission) {
        if (!this.data || !this.data[id])
            return false;

        for (const index in this.data[id])
            if (this.data[id][index] === permission)
                return true;

        return false;
    }

    /**
     * Returns an array of permissions of the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @return {Array}
     */
    static getAll(id) {
        if (!this.data || !this.data[id])
            return [];

        return this.data[id];
    }

}
