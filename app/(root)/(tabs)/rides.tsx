import RideCar from "@/components/RideCar";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rides = () => {
  const { user } = useUser();

  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`
  );

  return (
    <SafeAreaView>
      <FlatList
        data={recentRides}
        className={"p-5"}
        renderItem={({ item }) => <RideCar ride={item} />}
        ListEmptyComponent={() => (
          <View className="flex flex-col justify-center items-center h-full w-full">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-[300px] h-[300px]"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent ride found!</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row justify-start items-center mb-5">
              <Text className="text-xl font-JakartaExtraBold">All Rides</Text>

              {/* <TouchableOpacity>
                <Text className="text-md font-JakartaSemiBold text-blue-500">
                  Ascending
                </Text>
              </TouchableOpacity> */}
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Rides;
