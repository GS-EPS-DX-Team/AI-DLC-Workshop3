export default function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        말해 뭐해
      </h2>
      <p className="text-base text-gray-600 mb-2">
        요구사항을 자유롭게 입력해주세요
      </p>
      <p className="text-sm text-gray-400 max-w-sm">
        텍스트를 입력하거나 마이크 버튼을 눌러 음성으로 입력할 수 있습니다
      </p>
    </div>
  );
}
