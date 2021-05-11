package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import nl.csrdelft.plugins.contacts.ContactsPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        registerPlugin(ContactsPlugin.class);
    }
}
