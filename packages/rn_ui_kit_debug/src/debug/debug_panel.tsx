import { NavigationContainer, type NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Platform, View } from "react-native";
import { YStack } from "tamagui";
import { NativeSheet, NativeSheetStack } from "rn_ui_kit";

import { RnUiKitDebugHomePage } from "./pages/debug_home_page";
import { RnUiKitDebugSectionPage } from "./pages/debug_section_page";
import { rnUiKitDebugRouteDefinitions } from "./routes";

import type { RnUiKitDebugPanelProps, RnUiKitDebugRouteKey } from "./types";

type RnUiKitDebugStackParamList = {
  index: undefined;
} & Record<RnUiKitDebugRouteKey, undefined>;

const Stack = createNativeStackNavigator<RnUiKitDebugStackParamList>();
const DEBUG_PANEL_SHEET_OVERLAY_HOST = "rn-ui-kit-debug-panel-sheet-overlay";
const DEBUG_SECTION_SHEET_OVERLAY_HOST = "rn-ui-kit-debug-section-sheet-overlay";
const DEBUG_SECTION_SHEET_SNAP_POINTS = [50, 75, 100];
const debugSheetStackScreenOptions = {
  headerRight: undefined,
  headerStatusBarHeight: 0,
  headerStyle: { height: 56 },
};

export function RnUiKitDebugPanel({
  defaultOpen = true,
  initialRouteKey = "components",
  onOpenChange,
  open: openProp,
  sheetMode = false,
  ...props
}: RnUiKitDebugPanelProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (openProp == null) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  if (sheetMode) {
    return (
      <RnUiKitDebugPanelSheet
        initialRouteKey={initialRouteKey}
        onOpenChange={handleOpenChange}
        open={open}
        {...props}
      />
    );
  }

  return <RnUiKitDebugPanelContent initialRouteKey={initialRouteKey} {...props} />;
}

function RnUiKitDebugPanelSheet({
  onOpenChange,
  open,
  ...props
}: RnUiKitDebugPanelProps & { onOpenChange: (open: boolean) => void; open: boolean }) {
  const [openSectionsInSheet, setOpenSectionsInSheet] = useState(false);
  const [sectionSheetPosition, setSectionSheetPosition] = useState(0);
  const [openSectionSheets, setOpenSectionSheets] = useState<Set<RnUiKitDebugRouteKey>>(new Set());

  const handlePanelOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setOpenSectionSheets(new Set());
    onOpenChange(nextOpen);
  };

  function HomeRoute() {
    return (
      <RnUiKitDebugHomeRoute
        onOpenInSheet={(key) => setOpenSectionSheets((current) => new Set(current).add(key))}
        onOpenSectionsInSheetChange={(enabled) => {
          setOpenSectionsInSheet(enabled);
          if (!enabled) setOpenSectionSheets(new Set());
        }}
        onSectionSheetPositionChange={setSectionSheetPosition}
        openSectionsInSheet={openSectionsInSheet}
        sectionSheetPosition={sectionSheetPosition}
      />
    );
  }

  return (
    <>
      <NativeSheetStack
        initialRouteName="index"
        name="rn-ui-kit-debug-panel-sheet"
        onOpenChange={handlePanelOpenChange}
        open={open}
        overlayPortalHostName={DEBUG_PANEL_SHEET_OVERLAY_HOST}
        screenOptions={debugSheetStackScreenOptions}
        sheetProps={{ grabber: true, snapPoints: [88], snapPointsMode: "percent" }}
      >
        <NativeSheetStack.Screen name="index" options={{ title: "rn_ui_kit 调试" }}>
          {() => <HomeRoute />}
        </NativeSheetStack.Screen>
        {rnUiKitDebugRouteDefinitions.map((definition) => (
          <NativeSheetStack.Screen
            key={definition.key}
            name={definition.key}
            options={{ title: definition.label }}
          >
            {() => (
              <RnUiKitDebugSectionPage
                contentTitle={definition.label}
                instanceId={`panel-sheet-stack-${definition.key}`}
                layoutHost="nativeSheet"
                sectionKey={definition.key}
              />
            )}
          </NativeSheetStack.Screen>
        ))}
      </NativeSheetStack>

      <RnUiKitDebugSectionSheets
        instancePrefix="panel-sheet-section"
        onOpenChange={setOpenSectionSheets}
        openKeys={openSectionSheets}
        position={sectionSheetPosition}
      />
    </>
  );
}

function RnUiKitDebugPanelContent({
  initialRouteKey = "components",
  ...props
}: RnUiKitDebugPanelProps) {
  const [openSectionsInSheet, setOpenSectionsInSheet] = useState(false);
  const [panelSheetOpen, setPanelSheetOpen] = useState(false);
  const [sectionSheetPosition, setSectionSheetPosition] = useState(0);
  const [openSectionSheets, setOpenSectionSheets] = useState<Set<RnUiKitDebugRouteKey>>(new Set());

  return (
    <YStack background="$background" flex={1} {...props}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="index">
          <Stack.Screen name="index" options={{ title: "rn_ui_kit 调试" }}>
            {() => (
              <RnUiKitDebugHomeRoute
                onOpenInSheet={(key) =>
                  setOpenSectionSheets((current) => new Set(current).add(key))
                }
                onOpenPanelSheet={() => setPanelSheetOpen(true)}
                onOpenSectionsInSheetChange={(enabled) => {
                  setOpenSectionsInSheet(enabled);
                  if (!enabled) setOpenSectionSheets(new Set());
                }}
                onSectionSheetPositionChange={setSectionSheetPosition}
                openSectionsInSheet={openSectionsInSheet}
                sectionSheetPosition={sectionSheetPosition}
              />
            )}
          </Stack.Screen>
          {rnUiKitDebugRouteDefinitions.map((definition) => (
            <Stack.Screen
              key={definition.key}
              name={definition.key}
              options={{ title: definition.label }}
            >
              {() => (
                <RnUiKitDebugSectionPage
                  contentTitle={definition.label}
                  instanceId={`stack-${definition.key}`}
                  sectionKey={definition.key}
                />
              )}
            </Stack.Screen>
          ))}
        </Stack.Navigator>
      </NavigationContainer>

      <RnUiKitDebugSectionSheets
        instancePrefix="sheet"
        onOpenChange={setOpenSectionSheets}
        openKeys={openSectionSheets}
        position={sectionSheetPosition}
      />

      <RnUiKitDebugPanel
        onOpenChange={setPanelSheetOpen}
        open={panelSheetOpen}
        sheetMode
      />
    </YStack>
  );
}

function RnUiKitDebugHomeRoute({
  onOpenInSheet,
  onOpenPanelSheet,
  onOpenSectionsInSheetChange,
  onSectionSheetPositionChange,
  openSectionsInSheet,
  sectionSheetPosition,
}: {
  onOpenInSheet: (key: RnUiKitDebugRouteKey) => void;
  onOpenPanelSheet?: () => void;
  onOpenSectionsInSheetChange: (openInSheet: boolean) => void;
  onSectionSheetPositionChange: (position: number) => void;
  openSectionsInSheet: boolean;
  sectionSheetPosition: number;
}) {
  const navigation = useNavigation<NavigationProp<RnUiKitDebugStackParamList>>();

  return (
    <RnUiKitDebugHomePage
      onOpenSection={(key) => {
        if (openSectionsInSheet) return onOpenInSheet(key);
        navigation.navigate(key);
      }}
      onOpenPanelSheet={onOpenPanelSheet}
      onOpenSectionsInSheetChange={onOpenSectionsInSheetChange}
      onSectionSheetPositionChange={onSectionSheetPositionChange}
      openSectionsInSheet={openSectionsInSheet}
      sectionSheetPosition={sectionSheetPosition}
    />
  );
}

function RnUiKitDebugSectionSheets({
  instancePrefix,
  onOpenChange,
  openKeys,
  position,
}: {
  instancePrefix: string;
  onOpenChange: (keys: Set<RnUiKitDebugRouteKey>) => void;
  openKeys: Set<RnUiKitDebugRouteKey>;
  position: number;
}) {
  return rnUiKitDebugRouteDefinitions.map((definition) => (
    <NativeSheet
      handle
      key={definition.key}
      name={`rn-ui-kit-debug-${instancePrefix}-${definition.key}`}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          const next = new Set(openKeys);
          next.delete(definition.key);
          onOpenChange(next);
        }
      }}
      open={openKeys.has(definition.key)}
      overlayPortalHostName={`${DEBUG_SECTION_SHEET_OVERLAY_HOST}:${instancePrefix}:${definition.key}`}
      position={position}
      snapPoints={DEBUG_SECTION_SHEET_SNAP_POINTS}
      snapPointsMode="percent"
    >
      <View style={{ flex: 1 }}>
        <RnUiKitDebugSectionPage
          contentTitle={definition.label}
          instanceId={`${instancePrefix}-${definition.key}`}
          layoutHost={Platform.OS === "ios" || Platform.OS === "android" ? "nativeSheet" : "default"}
          sectionKey={definition.key}
        />
      </View>
    </NativeSheet>
  ));
}
