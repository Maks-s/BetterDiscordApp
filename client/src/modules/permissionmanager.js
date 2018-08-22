/**
 * BetterDiscord Permission Manager
 * Copyright (c) 2015-present Jiiks/JsSucks - https://github.com/Jiiks / https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

const PermissionMap = {
    IDENTIFY: {
        HEADER: 'Access your account information',
        BODY: 'Allows :NAME: to read your account information (excluding user token).'
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
    JOIN_SERVERS: {
        HEADER: 'Join servers for you',
        BODY: 'Allows :NAME: to join servers on your behalf.'
    },
    GET_INSTALLED_COMPONENT: {
        HEADER: 'Use installed components',
        BODY: 'Allows :NAME: to interact with other plugins / themes / modules'
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
    static async addPluginPermission(id, permission) {
        if (!PermissionMap[permission])
            return;

        if (!this.pluginsPermissions)
            this.pluginsPermissions = [];

        if (!this.pluginsPermissions[id])
            this.pluginsPermissions[id] = [];


        this.pluginsPermissions[id].push(permission);
    }

    /**
     * Add all specified permissions to the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @param {Array} permissions Array of permission to add
     * @return {Promise}
     */
    static async addPluginPermissions(id, permissions) {
        for (const permission of permissions)
            this.addPluginPermission(id, permission);
    }

    /**
     * Remove the passed permission from the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @param {String} permission Permission to remove
     * @return {Promise}
     */
    static async removePluginPermission(id, permission) {
        if (!this.pluginsPermissions || !this.pluginsPermissions[id])
            return;

        for (const index in this.pluginsPermissions[id]) {
            if (this.pluginsPermissions[id][index] === permission) {
                this.pluginsPermissions[id].splice(index, 1);
                break;
            }
        }
    }

    /**
     * Remove all permissions from the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @return {Promise}
     */
    static async removePluginPermissions(id) {
        if (!this.pluginsPermissions || !this.pluginsPermissions[id])
            return;

        delete this.pluginsPermissions[id];
    }

    /**
     * Checks if the plugin with the passed ID has the passed permission
     * @param {String} id Plugin's ID
     * @param {String} permission Permission to check
     * @return {Boolean}
     */
    static hasPermission(id, permission) {
        if (!this.pluginsPermissions || !this.pluginsPermissions[id])
            return false;

        for (const index in this.pluginsPermissions[id])
            if (this.pluginsPermissions[id][index] === permission)
                return true;

        return false;
    }

    /**
     * Returns an array of permissions of the plugin with the passed ID
     * @param {String} id Plugin's ID
     * @return {Array}
     */
    static getPermissions(id) {
        if (!this.pluginsPermissions || !this.pluginsPermissions[id])
            return [];

        return this.pluginsPermissions[id];
    }

}
