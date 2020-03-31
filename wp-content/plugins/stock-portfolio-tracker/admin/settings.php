<?php defined('SPT_ROOT_DIR') or die('Direct access is not allowed'); ?>

<div class="wrap">
    <?php if ($settingsSaved): ?>
        <div class="notice notice-success">
            <p>
                <?php esc_html_e('Settings are successfully saved', 'stock-portfolio-tracker')?>
            </p>
        </div>
    <?php endif; ?>

    <h2><?php print self::NAME ?> <span class="title-count "><?php print self::VERSION ?></span></h2>
    <h3>
        <?php esc_html_e('Plugin settings', 'stock-portfolio-tracker')?>
    </h3>

    <div class="smw-wrapper">
        <form method="post" action="<?php menu_page_url(self::ID) ?>">
            <table class="form-table">
                <tbody>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Color scheme', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <select name="color">
                                <?php foreach(['orange','yellow','green','cyan','turquoise','blue','purple','red'] as $color):?>
                                    <option value="<?php print $color?>" <?php print $color==esc_attr($this->getSetting('color')) ? 'selected' : ''?>>
                                        <?php print ucfirst($color)?>
                                    </option>
                                <?php endforeach;?>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Firebase API key', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <input type="text" name="firebase_api_key" value="<?php print esc_attr($this->getSetting('firebase_api_key'))?>" class="regular-text">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Firebase application ID', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <input type="text" name="firebase_app_id" value="<?php print esc_attr($this->getSetting('firebase_app_id'))?>" class="regular-text">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Firebase sender ID', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <input type="text" name="firebase_sender_id" value="<?php print esc_attr($this->getSetting('firebase_sender_id'))?>" class="regular-text">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Enable Firebase authentication', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <input type="checkbox" name="firebase_auth" <?php print $this->getSetting('firebase_auth') ? 'checked="checked"': ''?>>
                            <p class="description"><?php esc_html_e('Require users to log in / sign up (note that it is different from WordPress authentication).', 'stock-portfolio-tracker')?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Locale', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <input type="text" name="locale" value="<?php print esc_attr($this->getSetting('locale'))?>" class="regular-text">
                            <p class="description">
                                <?php esc_html_e('Locale for dates formatting. Example: de_DE, de_CH, fr_FR, it_IT, el_GR, cs_CZ, ru_RU, pt_BR', 'stock-portfolio-tracker')?>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Thousands separator', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <input type="text" name="thousands_separator" value="<?php print esc_attr($this->getSetting('thousands_separator'))?>" class="regular-text">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Decimal separator', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <input type="text" name="decimal_separator" value="<?php print esc_attr($this->getSetting('decimal_separator'))?>" class="regular-text">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('Enqueue priority', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <input type="number" name="enqueue_priority" value="<?php print esc_attr($this->getSetting('enqueue_priority'))?>" class="regular-text">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label><?php esc_html_e('AJAX method', 'stock-portfolio-tracker')?></label>
                        </th>
                        <td>
                            <select name="ajax_method">
                                <option value="get" <?php print $this->getSetting('ajax_method')=='get' ? 'selected="selected"' : ''?>><?php esc_html_e('GET', 'stock-portfolio-tracker') ?></option>
                                <option value="post" <?php print $this->getSetting('ajax_method')=='post' ? 'selected="selected"' : ''?>><?php esc_html_e('POST', 'stock-portfolio-tracker') ?></option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" value="<?php esc_html_e('Save settings', 'stock-portfolio-tracker')?>" class="button button-primary">
        </form>
    </div>
</div>