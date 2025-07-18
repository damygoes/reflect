import { COLORS } from '@/constants/colors';
import { useDeleteJournalEntry } from '@/features/journal-entries/hooks/useDeleteJournalEntry';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
interface Props {
  entryId: string;
}

export const JournalEntryActions = ({ entryId }: Props) => {
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const deleteMutation = useDeleteJournalEntry();

  const handleNavigateToEditEntry = () => {
    router.push(`/history/edit-entry/${entryId}`);
  };

  // const handleNavigateToEntryDetails = () => {
  //   router.push(`/history/entry-details/${entryId}`);
  // };

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMutation.mutate({ id: entryId }),
        },
      ]
    );
  };

  return (
    <>
      <View className="flex-row justify-start gap-8 mt-4">
        {/* Edit */}
        <TouchableOpacity
          onPress={handleNavigateToEditEntry}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Ionicons
            name="create-outline"
            size={16}
            color={colors.textSecondary}
          />
          <Text
            className="ml-1 text-base"
            style={{
              color: colors.textSecondary,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Ionicons name="trash-outline" size={16} color={colors.textError} />
          <Text className="ml-1 text-base" style={{ color: colors.textError }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>

      {/* <EditJournalModal id={entryId} visible={modalVisible} onCancel={closeModal} /> */}
    </>
  );
};
